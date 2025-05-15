/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from 'src/schemas/product.schema';
import { Category } from 'src/schemas/category.schema';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

function createMocks(overrides?: {
  categoryFindOne?: jest.Mock;
  categoryCreate?: jest.Mock;
  productFindOne?: jest.Mock;
  productCreate?: jest.Mock;
  productFind?: jest.Mock;
  productFindByIdAndUpdate?: jest.Mock;
  productsValue?: any[];
}) {
  const productsValue = overrides?.productsValue ?? [];
  const mockCategoryDoc = { _id: 'mockCategoryId', name: '3x3' };

  const mockCategoryModel = {
    findOne:
      overrides?.categoryFindOne ??
      jest.fn().mockResolvedValue(mockCategoryDoc),
    create:
      overrides?.categoryCreate ??
      jest.fn().mockResolvedValue({ _id: 'newCategoryId', name: '3x3' }),
  };

  const populateMock = jest.fn().mockResolvedValue(productsValue);
  const whereMock = jest.fn().mockReturnValue({ populate: populateMock });
  const selectMock = jest.fn().mockReturnValue({ where: whereMock });
  const findMock =
    overrides?.productFind ?? jest.fn().mockReturnValue({ select: selectMock });

  const mockProductModel = {
    findOne:
      overrides?.productFindOne ??
      jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      }),
    create:
      overrides?.productCreate ??
      jest
        .fn()
        .mockImplementation((data) =>
          Promise.resolve({ _id: 'newProductId', ...data }),
        ),
    find: overrides?.productFind ?? findMock,
    findByIdAndUpdate:
      overrides?.productFindByIdAndUpdate ??
      jest.fn().mockImplementation((id: string, data: { $set: any }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const index = productsValue.findIndex((p) => p._id === id);
        if (index === -1) return Promise.resolve(null);

        const updatedProduct = { ...productsValue[index], ...data.$set };
        productsValue[index] = updatedProduct;

        return Promise.resolve(updatedProduct);
      }),
  };

  return { mockCategoryModel, mockProductModel };
}

async function setupTestingModule(
  overrides?: Parameters<typeof createMocks>[0],
) {
  const { mockCategoryModel, mockProductModel } = createMocks(overrides);

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProductService,
      { provide: getModelToken(Product.name), useValue: mockProductModel },
      { provide: getModelToken(Category.name), useValue: mockCategoryModel },
    ],
  }).compile();

  const service = module.get<ProductService>(ProductService);

  return { service, mockCategoryModel, mockProductModel };
}

describe('ProductService', () => {
  const mockProducts = [
    {
      _id: 'prod1',
      name: 'Product 1',
      slug: 'product-1',
      description: 'Description 1',
      price: 10,
      stock: 5,
      images: [],
      tags: ['tag1'],
      category: { name: 'Category 1' },
      isDelete: false,
    },
    {
      _id: 'prod2',
      name: 'Product 2',
      slug: 'product-2',
      description: 'Description 2',
      price: 20,
      stock: 2,
      images: [],
      tags: ['tag2'],
      category: { name: 'Category 2' },
      isDelete: true,
    },
  ];

  it('should be defined.', async () => {
    const { service } = await setupTestingModule();
    expect(service).toBeDefined();
  });

  describe('ProductService - getAllProducts', () => {
    it('should return all products with selected fields and populated category', async () => {
      const populateMock = jest.fn().mockResolvedValue([mockProducts[0]]);
      const whereMock = jest.fn().mockReturnValue({ populate: populateMock });
      const selectMock = jest.fn().mockReturnValue({ where: whereMock });
      const findMock = jest.fn().mockReturnValue({ select: selectMock });

      const { service } = await setupTestingModule({
        productFind: findMock,
      });

      const result = await service.getAllProducts();

      expect(result).toEqual([mockProducts[0]]);
    });
  });

  describe('ProductService - getDeletedProducts', () => {
    it('should return all deleted products with selected fields and populated category', async () => {
      const { service } = await setupTestingModule({
        productsValue: mockProducts,
      });

      const result = await service.getDeletedProducts();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('ProductService - getProductBySlug', () => {
    it('should return single product with an specific slug', async () => {
      const populateMock = jest.fn().mockResolvedValue(mockProducts[0]);
      const whereMock = jest.fn().mockReturnValue({ populate: populateMock });
      const selectMock = jest.fn().mockReturnValue({ where: whereMock });
      const findOneMock = jest.fn().mockReturnValue({ select: selectMock });

      const { service } = await setupTestingModule({
        productFindOne: findOneMock,
      });

      const result = await service.getProductBySlug('product-1');

      expect(result).toEqual(mockProducts[0]);
      expect(result.slug).toEqual('product-1');
    });

    it('should throw HttpException if slug not found.', async () => {
      const populateMock = jest.fn().mockResolvedValue(null);
      const whereMock = jest.fn().mockReturnValue({ populate: populateMock });
      const selectMock = jest.fn().mockReturnValue({ where: whereMock });
      const findOneMock = jest.fn().mockReturnValue({ select: selectMock });

      await expect(
        setupTestingModule({
          productFindOne: findOneMock,
        }).then(({ service }) => service.getProductBySlug('any-slug')),
      ).rejects.toThrow('Product not found');
    });
  });

  describe('ProductService - createNewProduct', () => {
    it('should create a new product.', async () => {
      const { service, mockProductModel } = await setupTestingModule();

      const data: CreateProductDTO = {
        name: 'GAN 356 M Lite 3x3',
        description: {
          longDescription: '...',
          materials: 'ABS Plastic, Magnets',
          manufacturer: 'GAN Cube',
        },
        price: 24.95,
        stock: 30,
        images: ['puzzle', 'cube', '3x3', 'magnetic', 'speedcube'],
        tags: ['puzzle', 'cube', '3x3', 'magnetic', 'speedcube'],
        category: '3x3',
      };

      const result = await service.createNewProduct(data);

      expect(result).toHaveProperty('_id', 'newProductId');
      expect(mockProductModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: data.name,
          slug: 'gan-356-m-lite-3x3',
          category: 'mockCategoryId',
        }),
      );
    });

    it('should create the category if it does not exist.', async () => {
      const { service, mockCategoryModel } = await setupTestingModule({
        categoryFindOne: jest.fn().mockResolvedValue(null),
        categoryCreate: jest
          .fn()
          .mockResolvedValue({ _id: 'newCategoryId', name: '3x3' }),
      });

      const data: CreateProductDTO = {
        name: 'GAN 356 M Lite 3x3',
        description: {
          longDescription: '...',
          materials: 'ABS',
          manufacturer: 'GAN',
        },
        price: 24.95,
        stock: 10,
        images: ['cube'],
        tags: ['cube'],
        category: '3x3',
      };

      const result = await service.createNewProduct(data);

      expect(mockCategoryModel.create).toHaveBeenCalledWith({ name: '3x3' });
      expect(result).toHaveProperty('_id', 'newProductId');
      expect(result).toHaveProperty('category', 'newCategoryId');
    });

    it('should generate a unique slug if the slug already exists.', async () => {
      const existingSlugProduct = { _id: 'existingId' };

      const { service } = await setupTestingModule({
        productFindOne: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(existingSlugProduct),
        }),
      });

      const spySlug = jest.spyOn(
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('src/utils/slug.utils'),
        'generateUniqueSlug',
      );
      spySlug.mockReturnValue('gan-356-m-lite-3x3-1');

      const data: CreateProductDTO = {
        name: 'GAN 356 M Lite 3x3',
        description: {
          longDescription: '...',
          materials: 'ABS',
          manufacturer: 'GAN',
        },
        price: 24.95,
        stock: 10,
        images: ['cube'],
        tags: ['cube'],
        category: '3x3',
      };

      const result = await service.createNewProduct(data);

      expect(spySlug).toHaveBeenCalledWith('GAN 356 M Lite 3x3');
      expect(result.slug).toBe('gan-356-m-lite-3x3-1');
    });

    it('should throw HttpException if something fails.', async () => {
      await expect(
        setupTestingModule({
          categoryFindOne: jest.fn().mockRejectedValue(new Error('DB error')),
        }).then(({ service }) =>
          service.createNewProduct({
            name: 'GAN 356 M Lite 3x3',
            description: {
              longDescription: '...',
              materials: 'ABS',
              manufacturer: 'GAN',
            },
            price: 24.95,
            stock: 10,
            images: ['cube'],
            tags: ['cube'],
            category: '3x3',
          }),
        ),
      ).rejects.toThrow('Failed to create product');
    });

    it('should set images to an empty array and ratingAvg to 0.', async () => {
      const { service } = await setupTestingModule();

      const data: CreateProductDTO = {
        name: 'GAN 356 M Lite 3x3',
        description: {
          longDescription: '...',
          materials: 'ABS',
          manufacturer: 'GAN',
        },
        price: 24.95,
        stock: 10,
        images: ['cube'],
        tags: ['cube'],
        category: '3x3',
      };

      const result = await service.createNewProduct(data);

      expect(result.images).toEqual([]);
      expect(result.ratingAvg).toBe(0);
    });
  });

  describe('ProductService - updateProductById', () => {
    it('should update a product.', async () => {
      const { service } = await setupTestingModule({
        productsValue: mockProducts,
      });

      const data: UpdateProductDTO = {
        price: 28,
        stock: 20,
      };

      const result = await service.updateProductById('prod1', data);

      expect(result).toHaveProperty('_id', 'prod1');
      expect(result).toHaveProperty('price', 28);
      expect(result).toHaveProperty('stock', 20);
    });

    it('should create a category if it does not exist.', async () => {
      const { service } = await setupTestingModule({
        productsValue: mockProducts,
      });

      const data: UpdateProductDTO = {
        price: 28,
        stock: 20,
        category: 'mockCategoryId',
      };

      const result = await service.updateProductById('prod1', data);

      expect(result).toHaveProperty('_id', 'prod1');
      expect(result).toHaveProperty('price', 28);
      expect(result).toHaveProperty('stock', 20);
      expect(result).toHaveProperty('category', 'mockCategoryId');
    });

    it('should create a category if it does not exist.', async () => {
      const { service } = await setupTestingModule({
        productsValue: mockProducts,
      });

      const data: UpdateProductDTO = {
        name: 'GAN 356 M Lite 3x3',
      };

      const spySlug = jest.spyOn(
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('src/utils/slug.utils'),
        'generateUniqueSlug',
      );
      spySlug.mockReturnValue('gan-356-m-lite-3x3-1');

      const result = await service.updateProductById('prod1', data);

      expect(spySlug).toHaveBeenCalledWith('GAN 356 M Lite 3x3');
      expect(result).toHaveProperty('_id', 'prod1');
      expect(result.slug).toBe('gan-356-m-lite-3x3');
    });

    it('should throw HttpException if something fails.', async () => {
      await expect(
        setupTestingModule({
          productFindByIdAndUpdate: jest
            .fn()
            .mockRejectedValue(new Error('DB error')),
        }).then(({ service }) =>
          service.updateProductById('prod1', {
            price: 24.95,
            stock: 10,
          }),
        ),
      ).rejects.toThrow('Failed to update product');
    });
  });
});

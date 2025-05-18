import { Controller, Delete, Param, Patch } from '@nestjs/common';
import { RestoreProductService } from '../application/restore.service';
import { DeleteProductService } from '../application/deleted.service';

@Controller('products')
export class DeletedProductController {
  constructor(
    private readonly restoreService: RestoreProductService,
    private readonly deleteService: DeleteProductService,
  ) {}

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.restoreService.restore(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteService.delete(id);
  }
}

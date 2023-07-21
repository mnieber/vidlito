import { data, operation } from 'skandha';
import { Deletion } from 'skandha-facets';

export class DeletionWithFlag extends Deletion {
  static className = () => 'Deletion';
  static skandhaSymbol = Symbol('DeletionWithFlag');

  @data isDeleteEnabled: boolean = false;

  @operation setIsDeleteEnabled(isDeleteEnabled: boolean) {
    this.isDeleteEnabled = isDeleteEnabled;
  }
}

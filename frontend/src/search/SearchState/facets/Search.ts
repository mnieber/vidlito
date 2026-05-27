import { data, operation } from 'skandha';

export class Search<FormT> {
  static className = () => 'Search';

  @data form?: FormT;

  @operation search(args: FormT) {
    this.form = args;
  }
}

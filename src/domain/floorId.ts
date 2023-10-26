import { Entity } from '../core/domain/Entity';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorId extends Entity<any> {
  get id(): UniqueEntityID {
    return this.id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
}

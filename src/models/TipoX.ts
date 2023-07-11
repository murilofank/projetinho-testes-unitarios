import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('tipo_x')
class TipoX {
    @PrimaryColumn()
    readonly id: string;

    @Column({ nullable: true })
    description: string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { TipoX };
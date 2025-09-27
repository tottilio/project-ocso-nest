import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number

    @ApiProperty({
        default: "Ocso juriquilla"
    })
    @Column('text')
    locationName: string
    @ApiProperty({
        default: "Av x #y"
    })
    @Column('text')
    locationAdress: string
    @ApiProperty({
        default: [1,2]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(() => Manager, {
        eager: true
    })
    @JoinColumn({
        name:'managerId'
    })
    manager:Manager

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name:'regionId'
    })
    region:Region

    @ManyToMany(() => Employee, (employee) => employee.location)
    employees: Employee[]
}

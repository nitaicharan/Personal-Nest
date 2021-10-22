import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "./user-role.enum";

export class CreateCatDto {
    @ApiProperty({
        type: [String],
        // isArray: true,
    })
    name: string[];

    @ApiProperty({
        description: 'The age of cat',
        minimum: 1,
        default: 1,
        type: Number,
    })
    age: number;

    @ApiProperty()
    breed: string;

    @ApiProperty({ enum: ['Admin', 'Moderator', 'User'], enumName: 'UserRole' })
    role: UserRole;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'array',
            items: {
                type: 'number',
            },
        },
    })
    coords: number[][];
}

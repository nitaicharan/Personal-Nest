import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {

    @ApiProperty()
    name: string;
}
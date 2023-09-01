import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
export class RoleDto {
  @IsNotEmpty()
  @Length(2, 40)
  @ApiProperty()
  name: string;
}

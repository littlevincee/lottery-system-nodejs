import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateParticipatedCustomerRequestDto {
  @IsMobilePhone('en-HK')
  @IsNotEmpty()
  mobile_number: string;
}

import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class RedeemPrizeRequestDto {
  @IsMobilePhone('en-HK')
  @IsNotEmpty()
  mobile_number: number;

  @IsNotEmpty()
  redeem_code: string;
}

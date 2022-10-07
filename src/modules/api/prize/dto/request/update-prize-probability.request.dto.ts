import { PickType } from '@nestjs/mapped-types';
import { CreatePrizeRequestDto } from './create-prize.request.dto';

export class UpdatePrizeProbabilityRequestDto extends PickType(
  CreatePrizeRequestDto,
  ['probability'] as const,
) {}
{
}

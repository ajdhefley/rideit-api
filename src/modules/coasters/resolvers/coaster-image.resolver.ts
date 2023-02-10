import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { CoasterImage } from '../models/coaster-image.model';
import { CoasterOutboundService } from '../../../services/outbound/coaster-outbound.service';

@ArgsType()
class CoasterImageQueryArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => CoasterImage)
export class CoasterImageResolver {
    constructor(
        private coasterService: CoasterOutboundService
    ) { }

    @Query(returns => [CoasterImage])
    async coasterImages(@Args() args: CoasterImageQueryArgs) {
        return await this.coasterService.getCoasterImages(args.coasterUrl);
    }
}
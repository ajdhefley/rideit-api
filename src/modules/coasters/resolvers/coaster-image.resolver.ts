import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoasterImage } from '../models/coaster-image.model';
import { CoasterOutboundService } from '../../../services/outbound/coaster-outbound.service';

@ArgsType()
class CoasterImageQueryArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@ArgsType()
class CoasterImageCreateArgs extends CoasterImage {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@ArgsType()
class CoasterImageValidateArgs {
    @Field(type => Int, { nullable: false })
    coasterImageId: number;
}

@Resolver(of => CoasterImage)
export class CoasterImageResolver {
    constructor(
        private coasterService: CoasterOutboundService
    ) { }

    @Query(returns => [CoasterImage])
    async coasterImages(@Args() args: CoasterImageQueryArgs) { 
        return this.coasterService.getCoasterImages(args.coasterUrl);
    }

    @Mutation(returns => CoasterImage)
    async createCoasterImage(@Args() args: CoasterImageCreateArgs) {
        return this.coasterService.saveCoasterImage(args.coasterUrl, args);
    }

    @Mutation(returns => CoasterImage)
    async verifyCoasterImage(@Args() args: CoasterImageValidateArgs) {
        return this.coasterService.verifyCoasterImage(args.coasterImageId);
    }
}
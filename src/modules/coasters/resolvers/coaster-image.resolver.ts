import { Args, ArgsType, Field, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoasterImage } from '../models/coaster-image.model';
import { CoasterOutboundService } from '../../../services/outbound/coaster-outbound.service';

@ArgsType()
class CoasterImageQueryArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@ArgsType()
class CoasterImageCreateArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;

    @Field(type => String, { nullable: false })
    imageUrl: string;

    @Field(type => Int, { nullable: false })
    width: number;

    @Field(type => Int, { nullable: false })
    height: number;
}

@ArgsType()
class CoasterImageUpdateArgs {
    @Field(type => Int, { nullable: false })
    coasterImageId: number;

    @Field(type => String, { nullable: true })
    base64: string;

    @Field(type => Boolean, { nullable: true })
    verified: boolean;
}

@Resolver(of => CoasterImage)
export class CoasterImageResolver {
    constructor(
        private coasterService: CoasterOutboundService
    ) { }

    @Query(returns => [CoasterImage])
    async coasterImages(@Args() args: CoasterImageQueryArgs) {
        const coaster = await this.coasterService.getCoasterByUrl(args.coasterUrl);
        return this.coasterService.getCoasterImages(coaster.coasterId);
    }

    @Mutation(returns => CoasterImage)
    async createCoasterImage(@Args() args: CoasterImageCreateArgs) {
        const coaster = await this.coasterService.getCoasterByUrl(args.coasterUrl);
        return this.coasterService.saveCoasterImage(coaster.coasterId, args);
    }

    @Mutation(returns => CoasterImage)
    async updateCoasterImage(@Args() args: CoasterImageUpdateArgs) {
        return this.coasterService.updateCoasterImage(0, args.coasterImageId);
    }
}
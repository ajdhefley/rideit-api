import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { CoasterImage } from '../models/coaster-image.model';
import { CoasterImageService } from '../services/coaster-image.service';

@ArgsType()
class CoasterImageArgs {
    @Field(type => Number, { nullable: false })
    coasterId: number;
}

@Resolver(of => CoasterImage)
export class CoasterImageResolver {
    constructor(private coasterImageService: CoasterImageService) { }

    @Query(returns => [CoasterImage])
    async coasterImages(@Args() args: CoasterImageArgs) {
        return this.coasterImageService.findBy(args.coasterId);
    }
}
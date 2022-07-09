import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoasterService } from '../services/coaster.service';
import { Coaster } from '../models/coaster.model';
import { CoasterImage } from '../models/coaster-image.model';
import { CoasterImageService } from '../services/coaster-image.service';

@ArgsType()
class CoasterArgs {
    @Field(type => String, { nullable: false })
    url?: string;
}

@ArgsType()
class CoasterFilterArgs {
    @Field(type => String, { nullable: false })
    name?: string;
}

@Resolver(of => Coaster)
export class CoasterResolver {
    constructor(
        private coasterService: CoasterService,
        private coasterImageService: CoasterImageService
    ) { }

    @Query(returns => [Coaster])
    async coasters() {
        return await this.coasterService.findAll();
    }

    @Query(returns => Coaster)
    async coaster(@Args() args: CoasterArgs) {
        return await this.coasterService.findOneBy(args.url);
    }

    @Query(returns => [Coaster])
    async coasterFilter(@Args() args: CoasterFilterArgs) {
        return await this.coasterService.findLike(args.name);
    }
}
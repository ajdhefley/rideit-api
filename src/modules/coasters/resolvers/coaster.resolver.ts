import { Args, ArgsType, Field, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Coaster } from '../models/coaster.model';
import { CoasterImage } from '../models/coaster-image.model';
import { HttpService } from '../../../services/http.service';

@ArgsType()
class CoasterArgs {
    @Field(type => String, { nullable: false })
    url?: string;
}

@ArgsType()
class CoasterFilterArgs {
    @Field(type => String, { nullable: false })
    filter?: string;
}

@Resolver(of => Coaster)
export class CoasterResolver {
    constructor(private http: HttpService) { }

    @Query(returns => [Coaster])
    async coasters() {
        return this.http.get(`${process.env.SERVICE_COASTER_URI}/coasters`);
    }

    @Query(returns => Coaster)
    async coaster(@Args() args: CoasterArgs) {
        return this.http.get(`${process.env.SERVICE_COASTER_URI}/coaster/${args.url}`);
    }

    @Query(returns => [Coaster])
    async filteredCoaster(@Args() args: CoasterFilterArgs) {
        return this.http.get(`${process.env.SERVICE_COASTER_URI}/coasters/search/${args.filter}`);
    }

    @ResolveField(resolves => [CoasterImage])
    async images(@Parent() parent: Coaster) {
        return this.http.get(`${process.env.SERVICE_COASTER_URI}/coaster/${parent.url}/images`);
    }
}
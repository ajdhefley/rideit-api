import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { Coaster } from '../models/coaster.model';
import { HttpService } from 'src/services/http.service';

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
    async coasterFilter(@Args() args: CoasterFilterArgs) {
        return this.http.get(`${process.env.SERVICE_COASTER_URI}/coasters/search/${args.name}`);
    }
}
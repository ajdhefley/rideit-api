import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';
import { CoasterImage } from '../models/coaster-image.model';
import { HttpService } from '../../../services/http.service';

@ArgsType()
class CoasterImageArgs {
    @Field(type => String, { nullable: false })
    coasterUrl: string;
}

@Resolver(of => CoasterImage)
export class CoasterImageResolver {
    constructor(private http: HttpService) { }

    @Query(returns => [CoasterImage])
    async coasterImages(@Args() args: CoasterImageArgs) { 
        return this.http.get(`${process.env.SERVICE_COASTER_URI}/coaster/images/${args.coasterUrl}`);
    }
}
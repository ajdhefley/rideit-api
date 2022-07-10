import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';
import { Coaster } from '../../coasters/models/coaster.model';

@ObjectType()
export class Comment {
    @Field(type => ID)
    commentId: number;

    @Field()
    body: string;

    @Field()
    timestamp: Date;

    @Field()
    likeCount: number;

    @Field()
    user: User;

    @Field()
    coaster: Coaster;
}
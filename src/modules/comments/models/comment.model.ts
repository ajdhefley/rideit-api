import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'comment ' })
export class Comment {
    @Field(type => ID)
    CommentId: number;

    @Field()
    Author: string;
    
    @Field()
    Body: string;

    @Field()
    Timestamp: Date;

    @Field()
    LikeCount: number;
}
import {ObjectType, Field, ID} from "type-graphql";
import {Student} from "../../student/model/Student.model";

@ObjectType()
export class UserType {
    @Field(()=>ID)
    id!: number;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field(()=> Student, {nullable: true})
    user?: Student;
}


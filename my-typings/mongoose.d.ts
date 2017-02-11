// Workaround to assign native Promise to mongoose's own deprecated Promise system
declare interface PromiseMongoose {
    Promise: any;
}
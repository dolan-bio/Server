// Workaround to assign native Promise to mongoose's own deprecated Promise system
interface PromiseMongoose {
    Promise: any;
}
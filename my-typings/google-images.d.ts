interface GoogleImageResult {
    url: string;
    type: string;
    width: number;
    height: number;
    size: number;
    thumbnail: {
        url: string,
        width: number,
        height: number,
    };
}

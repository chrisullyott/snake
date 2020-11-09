class Element {

    constructor(boardDims) {
        this.dims = boardDims;
    }

    pixel(x, y, color) {
        return { coord:[x, y], color:color };
    }

}

export default Element;

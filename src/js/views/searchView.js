class searchView{
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value
        
        this.#clearInput()
        
        return query
    }

    addHandleSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler()
        })
        
    }

    #clearInput() {
        this._parentElement.querySelector('.search__field').value='';
        
    }
}


export default new searchView()
import Api from "./api.js";

const root = document.getElementById('app');
const input = document.getElementById('input');
const checkBox = document.getElementById('checkBox');
const buttonFindForLength = document.getElementById('buttonFindForLength');
const buttonFindForSubString = document.getElementById('buttonFindForSubString');

const config = {
    root,
    input,
    caseSensitive: checkBox,
    buttonFindForLength,
    buttonFindForSubString,
}

class App {
    constructor({ root, input, caseSensitive, buttonFindForLength, buttonFindForSubString }) {
        this.root = root;
        this.input = input;
        this.caseSensitive = caseSensitive;
        this.loadedData = [];
        this.data = [];
        this.filter = null;

        this.buttonFindForLength = buttonFindForLength;
        this.buttonFindForSubString = buttonFindForSubString;

        this.loadData();

        this.input.addEventListener('blur', this.handleInputBlur('string'));
        this.caseSensitive.addEventListener('change', this.handleCheckBoxChange('caseSensitive'));
        this.buttonFindForLength.addEventListener('click', this.handleFindForLengthClick)
        this.buttonFindForSubString.addEventListener('click',this.handleFindForSubStringClick)
    }

    handleInputBlur = (key) => (event) => {
        const value = event.target.value;

        this.changeFilter(key, value);
    }

    handleCheckBoxChange = (key) => (event) => {
        const value = event.target.checked;

        this.changeFilter(key, value);
    }

    handleFindForLengthClick = () => {
        this.searchByLength();
    }

    handleFindForSubStringClick = () => {
        this.searchBySubString();
    }

    searchByLength() {
        const length = parseInt(this.filter?.string, 10);

        if (length) {
            this.data = this.loadedData.filter(it => it.length > length);
            this.render();
        }
    }

    searchBySubString() {
        const { string, caseSensitive } = this.filter;
        const flags = caseSensitive ? 'i' : '';
        const regexp = new RegExp(string, flags);

        if (string) {
            this.data = this.loadedData.filter(it => regexp.test(it))
        }

        this.render();
    }

    changeFilter(key, value) {
        this.filter = {
            ...this.filter,
            [key]: value
        }
    }

    getData() {
        console.log(this.data);
        return this.data;
    }

    loadData() {
        Api.loadData()
            .then(data => {
                this.loadedData = data;
                this.data = data;
            })
            .then(() => this.render())
            .then(() => this.getData());
    }

    renderList() {
        const items = this.data;
        let list = document.getElementById('list');

        if (list) {
            list.innerHTML = '';
        } else {
            list = document.createElement('div');
            list.id = 'list'
            list.classList.add('list');
        }

        items.map(it => {
            const item = document.createElement('div');

            item.classList.add('list-item')
            item.innerText = it;
            list.appendChild(item);
        })

        return list;
    }

    render() {
        const listOutput = this.renderList();

        this.root.appendChild(listOutput);
    }
}

const newApp = new App(config);
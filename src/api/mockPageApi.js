const pages = [
    {
        id: "home",
        title: "Home",
        body: "This site gives you a 'behind the scenes' of my internship at Burst...",
        type: "basic",
        overview_type: "",
        access: true,
        show_nav: true,
        content_type: 'page'
    },
    {
        id: "logs",
        title: "Blog",
        body: "Read about my days at Burst...",
        type: "overview",
        overview_type: "log",
        access: true,
        show_nav: true,
        content_type: 'page'
    },
    {
        id: "achievements",
        title: "Achievements",
        body: "Read about my accomplished and yet to accomplish achievements during my internship at Burst...",
        type: "overview",
        overview_type: "achievement",
        access: true,
        show_nav: true,
        content_type: 'page'
    },
    {
        id: "pages",
        title: "Pages",
        body: "Manage pages of internshipship site",
        type: "overview",
        overview_type: "page",
        access: false,
        show_nav: true,
        content_type: 'page'
    },
    {
        id: "notfound",
        title: "Oops.. Not found",
        body: "This page either does not exist, or was removed. Please go back to the home page.",
        type: "basic",
        overview_type: "",
        access: false,
        show_nav: false,
        content_type: 'page'
    }
];

function replaceAll(str) {
    return str.replace(' ', '').replace(/\W/g, '');
}

const generateId = (page) => {
    return replaceAll(page.title).toLowerCase();
};

class PageApi {
    static getAllPages() {
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], pages));
        });
    }

    static savePage(page) {
        return new Promise((resolve, reject) => {
            const minPageTitleLength = 1;
            if (page.title.length < minPageTitleLength || generateId(page).length < minPageTitleLength) {
                reject(`Title must be at least ${minPageTitleLength} characters.`);
            }

            if (page.id) {
                const existingPageIndex = pages.findIndex(a => a.id == page.id);
                pages.splice(existingPageIndex, 1, page);
            } else {
                page.id           = generateId(page);
                page.content_type = 'page';
                pages.push(page);
            }

            resolve(Object.assign({}, page));
        });
    }

    static deletePage(page) {
        return new Promise((resolve, reject) => {
            const indexOfPageToDelete = pages.findIndex(p => {
                p.id == page.id;
            });
            pages.splice(indexOfPageToDelete, 1);
            resolve(Object.assign({}, page));
        });
    }
}

export default PageApi;

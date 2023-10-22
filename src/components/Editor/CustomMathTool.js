export class CustomMath {
    static get toolbox() {
        return {
            title: "Формулы",
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 15.75V18M8.25 11.25H8.258V11.258H8.25V11.25ZM8.25 13.5H8.258V13.508H8.25V13.5ZM8.25 15.75H8.258V15.758H8.25V15.75ZM8.25 18H8.258V18.008H8.25V18ZM10.748 11.25H10.755V11.258H10.748V11.25ZM10.748 13.5H10.755V13.508H10.748V13.5ZM10.748 15.75H10.755V15.758H10.748V15.75ZM10.748 18H10.755V18.008H10.748V18ZM13.252 11.25H13.26V11.258H13.252V11.25ZM13.252 13.5H13.26V13.508H13.252V13.5ZM13.252 15.75H13.26V15.758H13.252V15.75ZM13.252 18H13.26V18.008H13.252V18ZM15.75 11.25H15.758V11.258H15.75V11.25ZM15.75 13.5H15.758V13.508H15.75V13.5ZM8.25 6H15.75V8.25H8.25V6ZM12 2.25C10.108 2.25 8.242 2.36 6.407 2.572C5.307 2.7 4.5 3.65 4.5 4.757V19.5C4.5 20.0967 4.73705 20.669 5.15901 21.091C5.58097 21.5129 6.15326 21.75 6.75 21.75H17.25C17.8467 21.75 18.419 21.5129 18.841 21.091C19.2629 20.669 19.5 20.0967 19.5 19.5V4.757C19.5 3.649 18.694 2.7 17.593 2.572C15.7364 2.35701 13.869 2.2495 12 2.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        }
    }

    render() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("math");

        const input = document.createElement("input");
        wrapper.append(input);

        return wrapper;
    }

    save(blockContent) {
        const input = blockContent.querySelector("input");
        console.log(input.value);

        return {
            url: input.value,
        }
    }
}
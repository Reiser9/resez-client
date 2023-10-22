export class CustomFiles {
    static get toolbox() {
        return {
            title: "Файл",
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.375 12.739L10.682 20.432C9.83811 21.2759 8.69351 21.75 7.50003 21.75C6.30655 21.75 5.16195 21.2759 4.31803 20.432C3.47411 19.5881 3 18.4435 3 17.25C3 16.0565 3.47411 14.9119 4.31803 14.068L15.258 3.12801C15.5367 2.84948 15.8675 2.62856 16.2315 2.47787C16.5956 2.32718 16.9857 2.24966 17.3797 2.24976C17.7737 2.24985 18.1639 2.32754 18.5278 2.47841C18.8918 2.62927 19.2225 2.85035 19.501 3.12901C19.7796 3.40768 20.0005 3.73847 20.1512 4.10252C20.3019 4.46656 20.3794 4.85672 20.3793 5.25072C20.3792 5.64472 20.3015 6.03484 20.1506 6.39881C19.9998 6.76278 19.7787 7.09348 19.5 7.37201L8.55203 18.32C8.26801 18.5923 7.88839 18.7411 7.49497 18.7361C7.10156 18.7311 6.72585 18.5717 6.44883 18.2924C6.1718 18.013 6.01564 17.6359 6.01399 17.2425C6.01234 16.849 6.16535 16.4707 6.44003 16.189L14.25 8.37901M8.56103 18.31L8.55103 18.32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        }
    }

    render() {
        const wrapper = document.createElement("input");
        wrapper.setAttribute("type", "file");

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
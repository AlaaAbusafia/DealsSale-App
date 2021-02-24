const apiHost = 'http://bakesaleforgood.com';

export default{
    async fetchInitialDeals(){
        try {
            let response = await fetch(apiHost + '/api/deals');
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }
};
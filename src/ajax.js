const apiHost = 'http://bakesaleforgood.com';

export default{
    async fetchInitialdeals(){
        try {
            const response = await fetch(apiHost + '/api/deals');
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchdealDetail(dealId){
        try {
            const response = await fetch(apiHost + '/api/deals' + dealId);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }
};
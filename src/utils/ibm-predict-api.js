const predictEmailTag = async (access_token)=>{
    let scoring_url= "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/cd0473f0-7962-4526-92ee-08515749a5fc/predictions?version=2021-03-07"
    let scoring_payload ={"input_data": [{"fields":["mail-message"],"values":[[ "Virat Kohli, AB de Villiers set to auction their 'Green Day' kits from 2016 IPL match to raise funds"], [ "Hey, Susi, whats wrong with you? Why aren't you "]   ]}]}
    try { 
        let response = await fetch(scoring_url, {
        method: 'POST',
     
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(scoring_payload),
        })
     return await response.json()
    }catch(err) {
        console.log(err)
      }
}

export{
    predictEmailTag
}
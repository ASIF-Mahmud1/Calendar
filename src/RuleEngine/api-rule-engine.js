import  {event}  from '../../sample/data/Event'

// List of Events that will be shown on the List
const eventList= event

  // It retruns an object, that tells which is the popular opinion of an user
  const calculatePopularOpinions=  (userProfile)=>{ 
    const eventsAttended= userProfile['eventsAddedToCalendar']
    
    let qualityWithFreq={}
    eventsAttended.forEach((event, index) => {
      event.opinion.forEach((qualities)=>{
        if( qualityWithFreq[qualities] )
        {
          qualityWithFreq[qualities]['count']=qualityWithFreq[qualities]['count'] +1
          qualityWithFreq[qualities]["eventIdList"].push(event["eventId"])
        }
        else 
        {
          const eventId= event["eventId"]
          qualityWithFreq[qualities]={
            count:1,
            eventIdList:[ eventId ]
          }
        }
  
      })
    });
  
    return  qualityWithFreq
  }
  
  
  const findEventById=(eventList, eventId)=>{
    const result = eventList.filter(event => event["eventId"] ==eventId  )
    return result
  }
  const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

  const calculatePopularTagsOfAnOpinion=(eventList, popularOpinion)=>{
   
    let totalOpinions= 0  
    for (const property in popularOpinion)
    {
     let tagCount=0 
    let storeTags=[]
     let eventIdList= popularOpinion[property]["eventIdList"]
     eventIdList.forEach((eventId)=>{
      let result= findEventById(eventList, eventId)
      if(result.length>0)                                 // event is found in DB
      {
        storeTags.push(...result[0]['tag'])              // for a given opinion what tags are commonly found
        tagCount= tagCount + result[0]['tag'].length
        // console.log("store tags ",storeTags)
      }
     })
     let tagsWithOccurence=  countOccurrences(storeTags)      // returns an object with tag and their freq.
     popularOpinion[property]["tag"]= tagsWithOccurence
     popularOpinion[property]["tagCount"]= tagCount
     totalOpinions = totalOpinions+ popularOpinion[property]["count"]
    }
    return {
      totalOpinions:totalOpinions,
      opinions: popularOpinion 
    }
  }

 const createTagFrequencyTable=(popularTags)=>{

  const tagProbabilityTable={}
  let totalOpinions=  popularTags["totalOpinions"]
  for (const property in popularTags["opinions"])
  {
    
    const opinions = popularTags["opinions"][property]
    for (const singleTag in opinions['tag'])
    {
      let tagWithProbability= (opinions['count'] / totalOpinions) * (opinions['tag'][singleTag]/opinions['tagCount'])
      if (tagProbabilityTable[singleTag])
      {
        tagProbabilityTable[singleTag]= tagProbabilityTable[singleTag]+ tagWithProbability
      } 
      else 
      {
        tagProbabilityTable[singleTag]= tagWithProbability
      }
    }
  }
  return tagProbabilityTable 
 }
 
const getTagFrequencyTable=(userProfile)=>{
    const popularOpinion=  calculatePopularOpinions(userProfile)

    const popularTags= calculatePopularTagsOfAnOpinion(eventList,popularOpinion) // eventList will come fro DB

    const tagWithProbability=  createTagFrequencyTable(popularTags)

    return tagWithProbability
}

export{
    getTagFrequencyTable
}
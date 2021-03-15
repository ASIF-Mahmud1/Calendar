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
  
  const sortTag=  Object.entries(tagProbabilityTable)
  .sort(([,a],[,b]) => b-a)
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  return sortTag  
 }
 
const getTagFrequencyTable=(userProfile)=>{
    const popularOpinion=  calculatePopularOpinions(userProfile)

    const popularTags= calculatePopularTagsOfAnOpinion(eventList,popularOpinion) // eventList will come fro DB

    const tagWithProbability=  createTagFrequencyTable(popularTags)

    return tagWithProbability
}

const findEventByTag=(eventList, tag)=>{ // ask Miss
  const result = eventList.filter((event) => {
    const response= event["tag"].find((Tag)=>{
      return Tag===tag
    })

    return response

 })
  return result
}

// const res= findEventByTag(newEvents, "science")
// console.log(res)

const removeDuplicateEvents=(featuredEvents)=>{
  const removeDuplicate = featuredEvents.reduce((acc, current) => {
    const x = acc.find(item => item.eventId === current.eventId);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return removeDuplicate
}
const recommendEvents = (newEvents, tagWithProbability)=>{
  const numberOfFeaturedEvent=2
  let featuredEvents =[]

  for (const tag in tagWithProbability) 
  {
    const res= findEventByTag(newEvents, tag)
    const proportion= Math.ceil(tagWithProbability[tag]* numberOfFeaturedEvent)
    if(proportion<=res.length)
    {
       featuredEvents =[...featuredEvents, ...res]
    } 
    else 
    {
      const elements= res.slice(0, 2);
      featuredEvents =[...featuredEvents, ...elements]
    }

  }
  const removeDuplicate =removeDuplicateEvents(featuredEvents)
  return removeDuplicate

}

//  const results= recommendEvents(newEvents,tagWithProbability)
//  console.log("Recommended Events \n",results) 

//  // Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());

// // Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, n);

export{
    getTagFrequencyTable,
    recommendEvents
}
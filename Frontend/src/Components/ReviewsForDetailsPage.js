import React, { useState } from 'react';
import { useEffect } from 'react';
import { loadState } from '../localStorage';
import ReviewItem from './ReviewItem';
import ReviewItemForDetailsPage from './ReviewItemForDetailsPage';

const filterItems = [
    { 
        id: 0,
        title : "All"
    },
    { 
        id: 1,
        title : "Published"
    },
    { 
        id: 2,
        title : "Hidden"
    }
]

const initialReviewsData = [
    { 
        id: 1,
        title: 'Rand Fishkin 1',
        time: '4 days ago',
        reviewNumber: 4.5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 1

    }, 
    { 
        id: 2,
        title: 'Rand Fishkin 2',
        time: '4 days ago',
        reviewNumber: 2.5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 0

    }, 
    { 
        id: 3,
        title: 'Rand Fishkin 3',
        time: '4 days ago',
        reviewNumber: 1.5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 1

    }, 
    { 
        id: 4,
        title: 'Rand Fishkin 4',
        time: '4 days ago',
        reviewNumber: 2.5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 0

    }, 
    { 
        id: 5,
        title: 'Rand Fishkin 5',
        time: '4 days ago',
        reviewNumber: 5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 1

    },
    { 
        id: 6,
        title: 'Rand Fishkin 6',
        time: '4 days ago',
        reviewNumber: 1.5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 1

    }, 
    { 
        id: 7,
        title: 'Rand Fishkin 7',
        time: '4 days ago',
        reviewNumber: 2.5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 0

    }, 
    { 
        id: 8,
        title: 'Rand Fishkin 8',
        time: '4 days ago',
        reviewNumber: 5,
        reviewText: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
        reviewStatus: 1

    }
]

const ITEMS_PER_PAGE = 5;

const  userData= loadState();


function ReviewsForDetailsPage({editable = false, user = userData?.id, onlyPublished = false}) {   
   
    const [ReviewsData , setReviewsData] = useState([]);

    const [filterState , setFilterState] = useState(0);
    const [filteredReviews , setFilteredReviews] = useState(ReviewsData);

    const [pageNumber , setPageNumber] = useState(1);
    const [totalPages , setTotalPages] = useState(1);


    useEffect(()=>{
        getReviews()
        
    },[])



    const getReviews = async()=>{
       
        let api_url = '';
        if(process.env.NODE_ENV === "development"){
            if(onlyPublished){
                api_url = `/nps/?user_id=${user}&published=True`;
            }else{
                api_url = `/nps/?user_id=${user}`;
            }
            
        }else{
            if(onlyPublished){
                api_url = `${process.env.REACT_APP_API_ROOT}/nps/?user_id=${user}&published=True`;  
            }else{
                api_url = `${process.env.REACT_APP_API_ROOT}/nps/?user_id=${user}`;  
            }  
        }
        let result = await fetch(api_url,{
            method:'GET',
            headers:{ 
                'Accept': '*/*'
            }        
        });
        result = await result.json(); 
             
        result.forEach(item => { item.published? item.reviewStatus = 1 : item.reviewStatus = 0 });
        console.log(result)
        setFilteredReviews(result)
        setReviewsData(result)
    }



    useEffect(()=>{
        
        setPageNumber(1)        
        if(filterState === 1){           
            let tempF = ReviewsData.filter(item => item.reviewStatus === 1)
            
            setFilteredReviews(tempF)
        }else if(filterState === 2){           
            let tempF = ReviewsData.filter(item => item.reviewStatus === 0)
            setFilteredReviews(tempF)
        }else{
            setFilteredReviews(ReviewsData)
        }
        
    },[filterState])

    useEffect(()=>{
        const reminder = filteredReviews.length % ITEMS_PER_PAGE;
       
        const total_pages = reminder > 0 ? (Math.floor(filteredReviews.length / ITEMS_PER_PAGE) + 1) : Math.floor(filteredReviews.length / ITEMS_PER_PAGE);
        setTotalPages(total_pages)
       console.log(`Total Pages: ${total_pages}`)
    },[filteredReviews])


    const paginate = (array, page_size, page_number) => {  
        
        array.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          })
            
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }


    


  return (
    <section className="reviews">
        <div className="sectionSmallHead dflx">
            <h2>Reviews:</h2>
        </div>
        { editable && 
        <div className="reviewsFilter">
           
            <ul className="dflx">
                {
                    filterItems.map((item)=>{
                        if(item.id === filterState){
                            return(
                                <li key={item.id}>
                                    <label>
                                        
                                        <input type="radio" name="review_filter" defaultChecked value={item.id} onClick={()=> setFilterState(item.id)}  />
                                        <span className="btn-review">{item.title}</span>
                                    </label>
                                </li>
                            )
                        }else{
                            return (
                                <li key={item.id}>
                                    <label>
                                        
                                        <input type="radio" name="review_filter"  value={item.id} onClick={()=> setFilterState(item.id)}  />
                                        <span className="btn-review">{item.title}</span>
                                    </label>
                                </li>
                            )
                        }
                        
                    })
                }                
                
            </ul>
        </div>
        }       

            <div className="reviewContainer">

                {filteredReviews.length<=0 ? <p>No Reviews yet!</p>:''}
               
                {
                    
                    paginate(filteredReviews,ITEMS_PER_PAGE, pageNumber).map(
                        ( {id,title,time,reviewNumber,reviewText,reviewStatus, sender_id,score,description,date } )=>
                        <ReviewItemForDetailsPage editable={editable} key={id}  id={id}  title={sender_id} time={date} reviewNumber={score} reviewText={description} reviewStatus={reviewStatus} />
                    )
                } 
            </div>   
            
            <div className="paginationWrap">
            {filteredReviews.length > 0 ?<ul className="dflx pagination">
                    <li className={pageNumber === 1 ? `disable` : ``} onClick={()=> setPageNumber(pageNumber - 1)}> PREVIOUS</li>
                    {Array.from(Array(totalPages), (e, i) => {
                    return <li key={i} className={pageNumber === (i+1) ? `active` : ``} onClick={()=> setPageNumber(i+1)}> {i+1}</li>
                    })}
                    <li className={pageNumber === totalPages ? `disable` : ``} onClick={()=> setPageNumber(pageNumber + 1)}> NEXT</li>
                </ul> :""}
            </div>
           
           
    </section>
  );
}

export default ReviewsForDetailsPage;

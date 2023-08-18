import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {



    static async injectDB(conn) {
        if (reviews) {
            console.log("ReviewsDAO already injected");
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_COLLECTION)
                                .collection('reviews');
        console.log("ReviewsDAO injected");                       
        } catch (e) {
            console.error(`Unable to connect to reviewsDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review, date) {
       
        try {

            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId),     
        }
       
    
      
        return await reviews.insertOne(reviewDoc);
    } catch (e) {
        console.error(`Unable to post review: ${e}`);
        return { error: e };
    }
    }


    static async updateReview(reviewId, review, userId, date) {
        try {
            console.log("review id", reviewId)
            
                return await reviews.updateOne({ _id: new ObjectId(reviewId)},{ $set: {review: review, date: date}});
    } catch (e) {
        console.error(`Unable to update review: ${e}`);
        return { error: e };

    }
    }

    
    static async deleteReview(reviewId) {
        try {
            const reviewDoc = {
                _id: new ObjectId(reviewId),
        }
        return await reviews.deleteOne(reviewDoc);
    } catch (e) {
        console.error(`Unable to delete review: ${e}`);
        return { error: e };
    }
}



}

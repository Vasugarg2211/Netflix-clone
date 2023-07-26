import CardSlider from "./CardSlider";
import "./Slider.css";

const Slider = ({movies}) => {
    
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };
    
    return (
        <div className="slider-container">
            <CardSlider title="Trending Now" data={getMoviesFromRange(0,10)} />
            <CardSlider title="New Releases" data={getMoviesFromRange(10,20)} />
            <CardSlider title="Popular on Netflix" data={getMoviesFromRange(20,30)} />
            <CardSlider title="Fantasy Shows" data={getMoviesFromRange(30,40)} />
            <CardSlider title="Shows you liked" data={getMoviesFromRange(40,50)} />
            <CardSlider title="You might be intersted in " data={getMoviesFromRange(50,60)} />
        </div>
    );
}
 
export default Slider;
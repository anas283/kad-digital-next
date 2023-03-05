import MockupImages from "./MockupImages";
import MockupCard from './MockupCard';

const ChooseTheme = () => {
  return (
    <>
      <div className="mockup-section py-3">
        <div className="row">
          {MockupImages.map((data, index) => {
            return (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <MockupCard
                  image={data.image} 
                  name_long={data.name_long} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default ChooseTheme
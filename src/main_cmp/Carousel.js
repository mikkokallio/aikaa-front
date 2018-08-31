import React from 'react';
import axios from "axios/index";
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    fi: {
        text1: "Jokainen tiimissä on tärkeä",
        text2: "Yhdessä yllätte korkeammalle",
        text3: "Oikeassa paikassa oikeaan aikaan",
    },
    sv: {
        text1: "Alla i teamet är viktiga",
        text2: "Tillsammans når ni högre höjder",
        text3: "På rätt plats vid rätt tidpunkt",
    }
});

class Carousel extends React.Component {

    render() {
        if (localStorage.getItem("language")!==null) strings.setLanguage(localStorage.getItem("language"));

        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        var list = this.props.data;
        shuffle(list);
        var afo1 = list[1];
        var afo2 = list[2];
        var afo3 = list[3];
        var author1 = ""; var quote1 = "";
        var author2 = ""; var quote2 = "";
        var author3 = ""; var quote3 = "";
        if (afo1) {
            author1 = afo1.author;
            quote1 = afo1.quote;
        }
        if (afo2) {
            author2 = afo2.author;
            quote2 = afo2.quote;
        }
        if (afo3) {
            author3 = afo3.author;
            quote3 = afo3.quote;
        }

        return (

            <div className="container">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">

                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">

                        <div className="item active">
                            <img src="https://media1.popsugar-assets.com/files/thumbor/_XIv2PMlWMie6FmqWMBh7pr-XHk/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/09/19/992/n/36735815/c5a39fb959c04d658f6b73.48321050_edit_img_cover_file_37438685_1477814400/i/39-Inspirational-Quotes-Change-Your-Life.jpg" alt="Mountain"
                                 style={{width: "100%"}}/>
                            <div className="carousel-caption">
                                <h3>{strings.text1}</h3>
                                <div className="stuffing">{author1}</div>
                                {/*<div className="button">Koe Lisää...</div>*/}
                            </div>
                        </div>

                        <div className="item">
                            <img src="https://www.diygenius.com/wp-content/uploads/2015/10/awe-and-inspiration-for-social-media.jpg" alt="Jump"
                                 style={{width: "100%"}}/>
                            <div className="carousel-caption">
                                <h3>{strings.text2}</h3>
                                <div className="stuffing">{author2}</div>
                            </div>
                        </div>

                        <div className="item">
                            <img src="https://media1.popsugar-assets.com/files/thumbor/tKJBwSKXyCFJu6dStFdMeBobPuM/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/09/093/n/3019466/1d7c4b07c55d3d62_StockSnap_I1IN2BBZUE.jpg" alt="Bike"
                                 style={{width: "100%"}}/>
                            <div className="carousel-caption">
                                <h3>{strings.text3}</h3>
                                <div className="stuffing">{author3}</div>
                            </div>
                        </div>

                    </div>

                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
    componentDidMount()
    {

    }

}
Carousel.defaultProps = {
    data: []
};

export default Carousel;
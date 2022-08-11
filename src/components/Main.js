// import Cookies from 'js-cookie'

//I LEFT COOKIES SO YOU CAN SEE BOTH WAY, MAYBE I DELETE SOME COOKIES BY MISTAKE BUT YOU GET THE IDEA
//I LEFT COOKIES SO YOU CAN SEE BOTH WAY, MAYBE I DELETE SOME COOKIES BY MISTAKE BUT YOU GET THE IDEA
//I LEFT COOKIES SO YOU CAN SEE BOTH WAY, MAYBE I DELETE SOME COOKIES BY MISTAKE BUT YOU GET THE IDEA
//I LEFT COOKIES SO YOU CAN SEE BOTH WAY, MAYBE I DELETE SOME COOKIES BY MISTAKE BUT YOU GET THE IDEA

import axios from 'axios'

const Main = ({ data, search, titleOrName, favorisData, setFavorisData, setNotFavoris }) => {
    let response;
    return (
        <>
            {
                data.results.map((character, index) => {
                    return (
                        character[titleOrName].indexOf(search) !== -1 &&
                        <div className="character" key={index} onClick={async () => {

                            const alreadyInFavoris = favorisData.findIndex(favoris => favoris.code === data.results[index]._id);
                            // const newTab = [...favorisData];

                            //if favoris is already add when u click on it, it will be remove ==> go check else part
                            if (alreadyInFavoris === -1) {
                                if (!data.results[index].description) {
                                    // newTab.push({
                                    //     titleOrName: data.results[index][titleOrName],
                                    //     img: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
                                    //     id: data.results[index]._id
                                    // })
                                    await axios.post("https://app-marvel-react.herokuapp.com/favoris/create", {
                                        name: data.results[index][titleOrName],
                                        url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
                                        code: data.results[index]._id,
                                    })
                                    response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                    // console.log(response.data, 'tt');
                                    setFavorisData(response.data.userFavoris)
                                    // Cookies.set('mycookies', JSON.stringify(newTab), { expires: 7 })
                                } else {
                                    // newTab.push({
                                    //     titleOrName: data.results[index][titleOrName],
                                    //     img: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
                                    //     description: data.results[index].description,
                                    //     id: data.results[index]._id
                                    // })
                                    await axios.post("https://app-marvel-react.herokuapp.com/favoris/create", {
                                        name: data.results[index][titleOrName],
                                        url_secure: `${data.results[index].thumbnail.path}.${data.results[index].thumbnail.extension}`,
                                        description: data.results[index].description,
                                        code: data.results[index]._id
                                    })
                                    // Cookies.set('mycookies', JSON.stringify(newTab), { expires: 7 })
                                    response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                }
                                response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                setFavorisData(response.data.userFavoris)
                            } else {
                                // if (favorisData.data.length === 1) {
                                //     Cookies.remove("mycookies")
                                //     setFavorisData([]);
                                // } else {
                                //     newTab.splice(favorisData.data.findIndex(favoris => favoris.id === data.results[index]._id), 1);
                                //     const nb = favorisData.data.findIndex(favoris => favoris.id === data.results[index]._id);
                                //     setFavorisData(newTab);
                                //     Cookies.set('mycookies', JSON.stringify(newTab), { expires: 7 })
                                //     console.log(favorisData.data[nb].id, "id favoris");
                                await axios.delete(`https://app-marvel-react.herokuapp.com/favoris/delete/${favorisData[alreadyInFavoris]._id}`)
                                response = await axios.get("https://app-marvel-react.herokuapp.com/favoris")
                                setFavorisData(response.data.userFavoris);
                                // }
                            }
                        }
                        }>
                            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="marvel's character" />
                            <span>{character[titleOrName]}</span>
                            {character.description && <p>{character.description}</p>}
                        </div>
                    )
                })
            }
        </>

    )
}

export default Main
import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = query =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((item, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>
                            Found {query} on{' '}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });

// const Search = () => {
//     const [options, setOptions] = useState([]);

//     const handleSearch = value => {
//         setOptions(value ? searchResult(value) : []);
//     };

//     const onSelect = value => {
//         console.log('onSelect', value);
//     };

//     return (
//         <AutoComplete
//             dropdownMatchSelectWidth={252}
//             style={{
//                 width: '100%',
//             }}
//             options={options}
//             onSelect={onSelect}
//             onSearch={handleSearch}
//         >
//             <Input.Search size="large" placeholder="input here" enterButton />
//         </AutoComplete>
//     );
// };

class Search extends React.Component { 
    state = {
        timeout: 0,
        options: []
    }

    handleSearch = (value) => {
        const { timeout } = this.state; 

        if (timeout) {
            clearTimeout(timeout); 
        }

        this.setState({
            timeout: setTimeout(() => {
                console.log("API call"); 
                this.setState({
                    options: value ? searchResult(value) : [],
                })
            }, 500)
        })
    }

    onSelect = value => {
        console.log('onSelect', value);
    };

    render() {
        const { options } = this.state; 

        return (
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{
                    width: '100%',
                }}
                options={options}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
            >
                <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
        )
    }
}

export default Search; 
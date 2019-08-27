import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleSubmit = async e => {
        // para nao executar a atualizacao da pagina por padrao do html
        e.preventDefault();
        //console.log(this.state);
        
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');

        // Post direto sem nao tivesse imagem, como o form tem imagem e multpart
        //await api.post('post', {
        //    author,
        //    place,
        //    description,
        //    hashtags,
        //})

        
    }

    render(){
        return (
            <form id="new-post" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange}/>
                
                <input type="text" name="author" placeholder="Autor do post" onChange={this.handleChange} valeu={this.state.author}/>
                <input type="text" name="place" placeholder="Local do post" onChange={this.handleChange} valeu={this.state.place}/>
                <input type="text" name="description" placeholder="Descricao do post" onChange={this.handleChange} valeu={this.state.description}/>
                <input type="text" name="hashtags" placeholder="HashTags do post" onChange={this.handleChange} valeu={this.state.hashtags}/>
                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default New;
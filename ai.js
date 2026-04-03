"use strict";

function sigmoid(x=0) {
    return 1 / (1 + Math.exp(-x));
}

function neuron(weights=[],bias=0) {
    this.weights = weights;
    this.bias = bias;
    this.state = 0;
    this.activate = function(data=[0]) {
        this.state = 0;
        for(let i=0; i<data.length; i++) {
            this.state += this.weights[i] * data[i];
        }
        this.state += this.bias;
        this.state = sigmoid(this.state);
        return this.state;
    }
}
function network(data=[[new neuron()]]) {
    this.data = data;
    this.activate = function(data=[0]) {
        let input = data;
        let output = [];
        for(let i=0; i<this.data.length; i++) {
            const layer = this.data[i];
            for(let j=0; j<layer.length; j++) {
                output.push(layer[j].activate(input));
            }
            input = output;
            output = [];
        }
        return input;
    }
    this.mutate = function(mutationChance=0) {
        // Hopefully this is right 🤮🤮
        for(let i=0; i<this.data.length; i++) {
            for(let j=0; j<this.data[i].length; j++) {
                for(let k=0; k<this.data[i][j].weights.length; k++) {
                    if(Math.random() < mutationChance) {
                        this.data[i][j].weights[k] += (Math.random() * 10 - 5);
                    }
                }
                if(Math.random() < mutationChance) {
                    this.data[i][j].bias += (Math.random() * 10 - 5);
                }
            }
        }
    }
    this.clone = function() {
        let copy = [];
        for(let i=0; i<this.data.length; i++) {
            let layer = [];
            for(let j=0; j<this.data[i].length; j++) {
                let weights = [];
                for(let k=0; k<this.data[i][j].weights.length; k++) {
                    weights[k] = this.data[i][j].weights[k];
                }
                let bias = this.data[i][j].bias;
                layer[j] = new neuron(weights, bias);
            }
            copy[i] = layer;
        }
        return new network(copy);
    }
    this.cross = function(mate=new network()) {
        let copy = [];
        for(let i=0; i<this.data.length; i++) {
            let layer = [];
            for(let j=0; j<this.data[i].length; j++) {
                let weights = [];
                for(let k=0; k<this.data[i][j].weights.length; k++) {
                    weights[k] = ((Math.random()>0.5)? this : mate).data[i][j].weights[k];
                }
                let bias = ((Math.random()>0.5)? this : mate).data[i][j].bias;
                layer[j] = new neuron(weights, bias);
            }
            copy[i] = layer;
        }
        return new network(copy);
    }
}

function createNetwork(inputSize=0,layers=[0]) {
    let data = [];
    for(let i=0; i<layers.length; i++) {
        let layer = [];
        for(let j=0; j<layers[i]; j++) {
            let weights = [];
            for(let k=0; k<inputSize; k++) {
                weights.push(Math.random());
            }
            layer.push(new neuron(weights, Math.random()));
        }
        inputSize = layer.length;
        data.push(layer);
    }
    return new network(data);
}

const xor = new network([[new neuron([3.7, 4.7],-6.4),new neuron([2.3, -0.3],-0.3),new neuron([6.8, 6.4],-2.9)],[new neuron([-9.6, -3.2, 10.2],-2.7)]]);

function prettyPrint(net=new network()) {
    let log="";
    for(let i=0; i<net.data.length; i++) {
        log += "Layer " + i + ":\n------------\n";
        for(let j=0; j<net.data[i].length; j++) {
            log += "Neuron " + j + ":\nWeights: " + net.data[i][j].weights + "\nBias: " + net.data[i][j].bias + "\n\n";
        }
        log += "------------\n\n";
    }
    return log;
}

/*let Birds = [];
for(let i=0; i<20; i++) Birds[i] = Object.assign({},xor);
for(let i=0; i<20; i++) {
    Birds[i].mutate(i/20);
    console.log(i);
    prettyPrint(Birds[i]);
}*/
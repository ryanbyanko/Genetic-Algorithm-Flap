# Genetic Algorithm Flappy Bird

A simple demonstration of a genetic algorithm where "birds" learn to play a Flappy Bird clone through trial and error.

Each bird is controlled by a simple neural network that recieves as input the bird's height on the screen, the bird's speed (how fast it's falling), as well as the x and y position of the next "pipe" obstacle. The network outputs a single a value from `0` to `1`, indicating its desire to "flap" or fly, which it does if the value passed the threshold `0.5`.

Each generation, the bird's are scored on how long they survive. At first, the weights of each bird's internal calculation are random and they don't get very far. After all the birds in a generation are dead the lowest scorers are removed, the top scorers "reproduce" and create the next generation with their superior genes, and every new bird is randomly mutated.

The top scorers are usually able to fly straight (not dying offscreen) after just a dozen generations, but it may take longer for a "breakthrough" that allows them to dynamically adjust their flying height based on the upcoming pipe's position. This may be because the fitness function (score) is only based on time alive and does not reward being close to passing through a pipe over not even making an effort.

Many of the parameters are tweakable with the provided sliders. Try different configurations out!

## Acknowledgements

This project was inspired by a YouTube thumbnail of someone who did the same project. I was also able to add the (extremely helpful) `speed` slider after replacing my previous "pseudo-gravity" implementation with a physics-based simulation. Thanks Mr. Woodruff! My neural network implementation is based on synaptic.js and it's helpful wiki, which was my first introduction to neural networks.
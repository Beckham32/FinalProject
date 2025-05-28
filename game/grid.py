import numpy as np
from perlin_noise import PerlinNoise

def generate_fractal_noise(shape, octaves=6):
    noise = PerlinNoise(octaves=octaves)
    height, width = shape
    noise_array = np.zeros((height, width))
    for i in range(height):
        for j in range(width):
            noise_array[i][j] = noise([i/height, j/width])
    return noise_array

def create_grid(rows, cols, noise):
    grid = []
    for r in range(rows):
        row = []
        for c in range(cols):
            val = noise[r, c]
            if val < 0.15:
                terrain = "wa" # Water
            elif val < 0.2:
                terrain = "sa" # Sand
            elif val < 0.6:
                terrain = "gr" # Grass
            elif val < 0.65:
                terrain = "di" # Dirt
            elif val < 0.85:
                terrain = "st" # Stone
            else:
                terrain = "tr" # Tree
            row.append(terrain)
        grid.append(row)
    return grid

def main():
    shape = (256, 256)  # height, width
    
    np.random.seed(0)
    noise = generate_fractal_noise(shape, 6)
    grid = create_grid(shape[0], shape[1], noise)
    
    for row in grid[:256]:
        print(row[256])

if __name__ == "__main__":
    main()
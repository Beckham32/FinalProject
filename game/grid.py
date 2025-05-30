import json
import numpy as np
from perlin_noise import PerlinNoise
import random

def generate_island_noise(shape, octaves=6):
    noise = PerlinNoise(octaves=octaves)
    height, width = shape
    noise_array = np.zeros((height, width))
    
    center_x, center_y = width / 2, height / 2
    max_distance = np.sqrt(center_x**2 + center_y**2)

    for i in range(height):
        for j in range(width):
            nx, ny = i / height, j / width
            distance = np.sqrt((j - center_x) ** 2 + (i - center_y) ** 2) / max_distance
            elevation = noise([nx, ny]) * 0.5 + 0.5  # Normalize to [0,1]
            attenuation = 1 - distance ** 2.5
            elevation *= attenuation
            noise_array[i][j] = elevation

    # Normalize again after falloff
    min_val, max_val = noise_array.min(), noise_array.max()
    noise_array = (noise_array - min_val) / (max_val - min_val)

    return noise_array

def create_biome_grid(rows, cols, noise, beach_width=6, water_border=10):
    grid = []

    for r in range(rows):
        row = []
        for c in range(cols):
            # Calculate dynamic border thickness with random jitter for water and beach
            jitter_water = random.randint(-2, 2)
            effective_water_border = max(2, water_border + jitter_water)
            jitter_beach = random.randint(-2, 2)
            effective_beach_width = max(2, beach_width + jitter_beach)

            # Distance to closest edge
            edge_distance = min(r, rows - r - 1, c, cols - c - 1)

            if edge_distance < effective_water_border:
                terrain = "wa"  # Wavy water edge
            elif edge_distance < effective_water_border + effective_beach_width:
                terrain = "sa"  # Sand (beach inside water)
            else:
                val = noise[r, c]
                # Add jitter to all biome thresholds for more organic edges
                jitter_mo = random.uniform(-0.03, 0.03)
                jitter_gr = random.uniform(-0.03, 0.03)
                jitter_pl = random.uniform(-0.03, 0.03)
                jitter_fo = random.uniform(-0.03, 0.03)
                jitter_co = random.uniform(-0.03, 0.03)

                if val < 0.15 + random.uniform(-0.02, 0.02):
                    terrain = "wa"
                elif val < 0.25 + random.uniform(-0.02, 0.02):
                    terrain = "sa"
                elif val < 0.45 + jitter_mo:
                    terrain = "mo"
                elif val < 0.6 + jitter_gr:
                    terrain = "gr"
                elif val < 0.75 + jitter_pl:
                    terrain = "pl"
                elif val < 0.85 + jitter_fo:
                    terrain = "fo"
                else:
                    terrain = "co"

            row.append(terrain)
        grid.append(row)

    return grid

def main():
    shape = (256, 256)
    np.random.seed(0)
    noise = generate_island_noise(shape, 6)
    grid = create_biome_grid(shape[0], shape[1], noise, beach_width=6, water_border=10)

    with open("map.json", "w") as f:
        json.dump(grid, f, indent=2)

    print("Map saved to map.json")

if __name__ == "__main__":
    main()

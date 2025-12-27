import os

def generate_tree(startpath, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = []
    
    tree_str = []
    
    for root, dirs, files in os.walk(startpath):
        # Modify dirs in-place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        tree_str.append('{}{}/'.format(indent, os.path.basename(root)))
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            tree_str.append('{}{}'.format(subindent, f))
            
    return '\n'.join(tree_str)

if __name__ == "__main__":
    # Exclude node_modules and .git as they are too large and not relevant for project structure understanding
    # .next is included as requested (implied by "start from .next") but beware it might be large
    excludes = ['node_modules', '.git'] 
    
    # Current directory
    cwd = os.getcwd()
    # Go into the main project folder if we are one level up, or stay here
    # Based on previous ls, the code is in 'nextjs14-aitoonic-done-...'
    # We should search dynamically or assuming we run this from relevant root.
    
    target_dir = '.'
    # Check if we are in the parent and need to go into the project folder
    items = os.listdir('.')
    for item in items:
        if item.startswith('nextjs14-aitoonic-done') and os.path.isdir(item):
            target_dir = item
            break
            
    print(f"Generating tree for: {os.path.abspath(target_dir)}")
    print(generate_tree(target_dir, excludes))

def add_tag(tag, tags=None):
    if tags is None:
        tags = {}
    tags[tag] = True
    return tags

a = add_tag('first')
b = add_tag('second')

print(a, b)
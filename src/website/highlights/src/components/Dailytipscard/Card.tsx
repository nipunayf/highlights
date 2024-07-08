import * as React from 'react';
import { Card, Group, Text, Menu, ActionIcon, Image, rem } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useState } from 'react';

function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [liked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Shrimp and Chorizo Paella</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" onClick={handleMenuClick}>
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={handleMenuClose}>Do not recommend this</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Image src="/download.jpeg" />

      <Card.Section inheritPadding>
        <Text variant="body2">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Text>
      </Card.Section>

      {expanded && (
        <Card.Section>
          <Text variant="body2">Method:</Text>
          <Text variant="body2">Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Text>
          <Text variant="body2">Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.</Text>
          <Text variant="body2">Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don't open.)</Text>
          <Text variant="body2">Set aside off of the heat to let rest for 10 minutes, and then serve.</Text>
        </Card.Section>
      )}
    </Card>
  );
}

export default RecipeReviewCard;

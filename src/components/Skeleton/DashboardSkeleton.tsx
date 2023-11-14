import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import React from 'react';
import { View } from 'react-native';
import { horizontalScale, verticalScale } from 'utils/config';
import { Divider } from 'components';

export const DashboardSkeleton = () => {
  return (
    <>
      <SkeletonPlaceholder.Item
        borderRadius={8}
        paddingVertical={35}
        width={'100%'}
        backgroundColor="rgba(254, 254, 254, 1)"
        marginHorizontal={14}
      >
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" justifyContent="space-between">
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={horizontalScale(211)}
                height={verticalScale(20)}
                borderRadius={8}
                backgroundColor="rgba(225, 230, 239, 1)"
              />

              <SkeletonPlaceholder.Item
                width={horizontalScale(211)}
                height={verticalScale(20)}
                borderRadius={8}
                marginTop={20}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
              <SkeletonPlaceholder.Item
                width={horizontalScale(121)}
                height={verticalScale(38)}
                borderRadius={54}
                marginTop={16}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={140}
              height={127}
              borderRadius={8}
              backgroundColor="rgba(225, 230, 239, 1)"
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        borderRadius={8}
        marginTop={16}
        width="100%"
        paddingVertical={35}
        marginHorizontal={14}
        backgroundColor="rgba(254, 254, 254, 1)"
      >
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item backgroundColor="rgba(254, 254, 254, 1)">
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={horizontalScale(144)}
                height={verticalScale(20)}
                borderRadius={8}
                marginBottom={8}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder.Item marginLeft={5}>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row' }}>
              {[...Array(4)].map((_, index) => (
                <View key={index}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    marginTop={7}
                    marginRight={45}
                    borderRadius={50}
                    backgroundColor="rgba(225, 230, 239, 1)"
                  />
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={10}
                    borderRadius={50}
                    marginTop={5}
                    backgroundColor="rgba(225, 230, 239, 1)"
                  />
                </View>
              ))}
            </View>
          </SkeletonPlaceholder>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <Divider style={{ marginTop: 20 }} />
      <SkeletonPlaceholder.Item
        borderRadius={8}
        marginTop={16}
        backgroundColor="rgba(254, 254, 254, 1)"
        paddingVertical={25}
        width="100%"
        marginHorizontal={14}
      >
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            backgroundColor="rgba(34, 39, 47, 1)"
            flexDirection="row"
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={horizontalScale(247)}
                height={verticalScale(28)}
                borderRadius={16}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item flexDirection="row" marginTop={10}>
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={horizontalScale(163)}
                height={verticalScale(188)}
                borderRadius={16}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={horizontalScale(163)}
                height={verticalScale(188)}
                borderRadius={16}
                marginLeft={10}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={horizontalScale(163)}
                height={verticalScale(188)}
                borderRadius={16}
                marginLeft={10}
                backgroundColor="rgba(225, 230, 239, 1)"
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </SkeletonPlaceholder.Item>
    </>
  );
};
